function create(group) {
    let { chapter_id, verse_id } = group[0]
    return `chapter-${chapter_id}-verse-${verse_id}`
}

function apply(groups) {
    groups.forEach(function(group) {
        group.id = create(group)
    })
    return groups
}

export default { apply }
