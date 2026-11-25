// Rehype plugin that sets rendered markdown in the Field Guide grammar:
// - code blocks become numbered "Listing n" figures with a language label
// - images standing alone in a paragraph become numbered "Fig. n" figures
// - tables get a horizontal scroll wrapper
// - "Exercise n: ..." headings get an exercise number chip
// - "Read more: …" paragraphs and "> **Aside:** …" blockquotes become margin notes

const LANG_NAMES = {
	c: 'C',
	cpp: 'C++',
	'c++': 'C++',
	cs: 'C#',
	csharp: 'C#',
	js: 'JavaScript',
	javascript: 'JavaScript',
	ts: 'TypeScript',
	typescript: 'TypeScript',
	py: 'Python',
	python: 'Python',
	rust: 'Rust',
	go: 'Go',
	asm: 'Assembly',
	nasm: 'Assembly',
	x86asm: 'Assembly',
	powershell: 'PowerShell',
	ps1: 'PowerShell',
	bash: 'Shell',
	sh: 'Shell',
	shell: 'Shell',
	shellsession: 'Shell',
	cmd: 'Command prompt',
	bat: 'Batch',
	json: 'JSON',
	yaml: 'YAML',
	xml: 'XML',
	html: 'HTML',
	css: 'CSS',
	diff: 'Diff',
	text: 'Output',
	txt: 'Output',
	plaintext: 'Output',
};

const el = (tagName, properties, children) => ({ type: 'element', tagName, properties: properties ?? {}, children: children ?? [] });
const txt = (value) => ({ type: 'text', value });

function isBlankText(node) {
	return node.type === 'text' && node.value.trim() === '';
}

function languageOf(pre) {
	const props = pre.properties ?? {};
	const fromData = props.dataLanguage ?? props['data-language'];
	if (fromData) return String(fromData);
	const code = (pre.children ?? []).find((c) => c.type === 'element' && c.tagName === 'code');
	const classes = [].concat(code?.properties?.className ?? []);
	const langClass = classes.find((c) => String(c).startsWith('language-'));
	return langClass ? String(langClass).slice('language-'.length) : '';
}

function langLabel(lang) {
	if (!lang) return 'Listing';
	return LANG_NAMES[lang.toLowerCase()] ?? lang.toUpperCase();
}

function exerciseHeading(node) {
	const idx = node.children.findIndex((c) => c.type === 'text' && c.value.trim() !== '');
	if (idx === -1) return;
	const text = node.children[idx];
	const match = /^\s*(Exercise\s+\d+)\s*[:.–—-]?\s*/i.exec(text.value);
	if (!match) return;
	const rest = text.value.slice(match[0].length);
	node.properties.className = [].concat(node.properties.className ?? [], 'exercise');
	node.children.splice(idx, 1, el('span', { className: ['exercise-no'] }, [txt(match[1])]), el('span', {}, [txt(rest)]));
}

const textOf = (node) =>
	node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

// Strip a leading "Label:" from the first text inside `children` (searching into <strong>/<em>).
function stripLead(children, re) {
	for (let i = 0; i < children.length; i++) {
		const c = children[i];
		if (c.type === 'text') {
			if (c.value.trim() === '') continue;
			c.value = c.value.replace(re, '');
			return children;
		}
		if (c.type === 'element' && (c.tagName === 'strong' || c.tagName === 'em') && /^\s*(Read more|Aside)\b/i.test(textOf(c))) {
			children.splice(i, 1);
			// Drop the separator that followed the bold label.
			const next = children[i];
			if (next?.type === 'text') next.value = next.value.replace(/^\s*:?\s*/, '');
			return children;
		}
		return children;
	}
	return children;
}

/**
 * A margin note is written as either:
 *   Read more: [link](url)        (a paragraph starting with "Read more:")
 *   > **Aside:** some remark       (a blockquote starting with a bold "Aside:")
 * It becomes <span class="margin-note"> attached to the nearest preceding paragraph or list, so CSS can
 * hang it in the right margin beside that text, or show it inline under it on narrow screens.
 */
function toMarginNote(node) {
	if (node.type !== 'element') return null;
	if (node.tagName === 'p' && /^\s*Read more\s*:/i.test(textOf(node))) {
		return { label: 'Read more', content: stripLead(node.children, /^\s*Read more\s*:\s*/i) };
	}
	if (node.tagName === 'blockquote') {
		const paras = node.children.filter((c) => c.type === 'element');
		if (paras[0]?.tagName === 'p' && /^\s*Aside\s*:/i.test(textOf(paras[0]))) {
			stripLead(paras[0].children, /^\s*Aside\s*:\s*/i);
			const content = paras.flatMap((p, i) =>
				p.tagName === 'p' ? [el('span', i ? { className: ['mn-para'] } : {}, p.children)] : [],
			);
			return { label: 'Aside', content };
		}
	}
	return null;
}

function attachMarginNotes(tree) {
	const kids = tree.children;
	for (let i = 0; i < kids.length; i++) {
		const note = toMarginNote(kids[i]);
		if (!note) continue;
		const span = el('span', { className: ['margin-note'], role: 'note' }, [
			el('span', { className: ['label-key'] }, [txt(note.label)]),
			txt(' '),
			...note.content,
		]);
		// Find the paragraph or list this note belongs beside: walk back past listings, figures and tables,
		// but never across a heading or rule.
		let host = null;
		for (let j = i - 1; j >= 0; j--) {
			const k = kids[j];
			if (k.type !== 'element') continue;
			if (/^h[1-6]$/.test(k.tagName) || k.tagName === 'hr') break;
			if (k.tagName === 'p' || k.tagName === 'ul' || k.tagName === 'ol') {
				host = k;
				break;
			}
		}
		if (host) {
			const target = host.tagName === 'p' ? host : [...host.children].reverse().find((c) => c.tagName === 'li') ?? host;
			target.properties.className = [].concat(target.properties.className ?? [], 'has-note');
			target.children.push(span);
			kids.splice(i, 1);
			i--;
		} else {
			kids[i] = el('p', { className: ['note-only'] }, [span]);
		}
	}
}

export default function rehypeFieldGuide() {
	return (tree) => {
		let listing = 0;
		let figure = 0;

		const walk = (parent) => {
			if (!parent.children) return;
			for (let i = 0; i < parent.children.length; i++) {
				const node = parent.children[i];
				if (node.type !== 'element') continue;

				if (node.tagName === 'pre') {
					listing += 1;
					const head = el('div', { className: ['listing-head'] }, [
						el('span', {}, [txt(langLabel(languageOf(node)))]),
						el('span', {}, [txt(`Listing ${listing}`)]),
					]);
					parent.children[i] = el('figure', { className: ['listing'] }, [head, node]);
					continue;
				}

				if (node.tagName === 'table') {
					parent.children[i] = el('div', { className: ['table-wrap'] }, [node]);
					continue;
				}

				if (node.tagName === 'p') {
					const kids = node.children.filter((c) => !isBlankText(c));
					if (kids.length === 1 && kids[0].type === 'element' && kids[0].tagName === 'img') {
						figure += 1;
						const img = kids[0];
						img.properties.loading = img.properties.loading ?? 'lazy';
						img.properties.decoding = 'async';
						const alt = String(img.properties.alt ?? '').trim();
						const caption = [el('b', {}, [txt(`Fig. ${figure}`)])];
						if (alt) caption.push(txt(alt));
						parent.children[i] = el('figure', { className: ['figure'] }, [img, el('figcaption', {}, caption)]);
						continue;
					}
				}

				if (/^h[1-4]$/.test(node.tagName)) {
					exerciseHeading(node);
				}

				walk(node);
			}
		};

		walk(tree);
		attachMarginNotes(tree);
	};
}
