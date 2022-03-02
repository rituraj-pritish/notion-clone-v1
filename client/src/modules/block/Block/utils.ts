function nextNode(node) {
	if (node.hasChildNodes()) {
		return node.firstChild
	} else {
		while (node && !node.nextSibling) {
			node = node.parentNode
		}
		if (!node) {
			return null
		}
		return node.nextSibling
	}
}

function getRangeSelectedNodes(range) {
	let node = range.startContainer
	const endNode = range.endContainer

	// Special case for a range that is contained within a single node
	if (node == endNode) {
		return [node]
	}

	// Iterate nodes until we hit the end container
	const rangeNodes = []
	while (node && node != endNode) {
		rangeNodes.push((node = nextNode(node)))
	}

	// Add partially selected nodes at the start of the range
	node = range.startContainer
	while (node && node != range.commonAncestorContainer) {
		rangeNodes.unshift(node)
		node = node.parentNode
	}

	// filter text nodes
	return rangeNodes.filter((node) => node.nodeType !== 3)
}

export function getSelectedNodes() {
	if (window.getSelection) {
		const sel = window.getSelection()
		if (!sel.isCollapsed) {
			return getRangeSelectedNodes(sel.getRangeAt(0))
		}
	}
	return []
}

export const richTextPayloadToHtml = (payload) => {
	let html = ''
	payload.forEach(({ id, text, annotations }) => {
		let style = ''
		if (annotations?.bold) {
			style = style.concat('font-weight:bold;')
		}
		if (annotations?.italic) {
			style = style.concat('font-style:italic;')
		}
		html = html.concat(
			`<span id=${id} style="${style}">${text === ' ' ? '&nbsp;' : text}</span>`
		)
	})

	return html
}

export const htmlToRichTextPayload = (html) => {
	const nodes = html.split('</span>')
	return nodes
		.filter((node) => node !== '')
		.map((node) => {
			const obj = { annotations: {} }
			const attrs = node.split('>')[0].split(' ')
			obj.text = node.split('>')[1]
			obj.id = attrs[1].replace('id=', '')

			const style = attrs[2]
			if (style.includes('font-weight')) obj.annotations.bold = true
			if (style.includes('italic')) obj.annotations.italic = true

			return obj
		})
}
