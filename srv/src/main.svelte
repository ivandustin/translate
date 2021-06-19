<script type="text/javascript">
    import { onMount }  from 'svelte'
    import settings     from './settings.js'
    import groupby      from './lib/groupby.js'
    import get          from './lib/get.js'
    import post         from './lib/post.js'
    import variants     from './lib/variants.js'
    import romanization from './lib/romanization.js'
    import delay        from './lib/delay.js'
    import next_tick    from './lib/next-tick.js'
    import groupid      from './lib/groupid.js'
    import VirtualList  from '@sveltejs/svelte-virtual-list'

    let words  = []
    let groups = []
    let start  = 0

    async function main() {
        words  = await get(`${settings.api}/words`)
        words  = romanization.apply(words)
        words  = variants.apply(words)
        groups = groupby(words, ['chapter_id', 'verse_id'])
        groups = groupid.apply(groups)
        start  = get_start(groups)
    }

    function is_incomplete(group) {
        return group.filter(word => !word.to).length > 0
    }

    function get_start(groups) {
        let index = groups.findIndex(is_incomplete)
        index     = index == -1 ? 0 : index
        index     = index == 0  ? 0 : index - 1
        return index
    }

    async function save(word) {
        let { chapter_id, verse_id, word_id, from, to } = word
        let data   = { from, to }
        let result = await post(`${settings.api}/chapters/${chapter_id}/verses/${verse_id}/words/${word_id}`, data)
        word.to    = result.to
        variants.apply(words)
        groups = groups
    }

    function change(word, to) {
        word.to = to
        return save(word)
    }

    onMount(main)
</script>

<div class="uppercase full-height">
    <VirtualList items={groups} let:item={group} bind:start>
        <div>
            <div id="{group.id}" class="group">
                <h2>
                    chapter <span>{group[0].chapter_id}</span> verse <span>{group[0].verse_id}</span>
                </h2>
                {#each group as word}
                    <div class="row flex">
                        <div class="left center nogrow">
                            <div class="up greek">{word.from}</div>
                            <div class="down">{word.romanization}</div>
                        </div>
                        <div class="middle nogrow">
                            <input class="stretch noborder uppercase"
                                type="text"
                                bind:value="{word.to}"
                                on:input={delay(()=> save(word))}>
                        </div>
                        <div class="right flex grow horizontal-scroll">
                            {#each word.variants as variant}
                                <div class="entry">
                                    <div class="clickable" on:dblclick={change(word, variant)}>{variant}</div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </VirtualList>
</div>

<style type="text/css">
    .left {
        min-width: 180px;
    }
    .middle {
        min-width: 200px;
    }
    .entry {
        display: flex;
        align-items: center;
        white-space: nowrap;
        padding: 0 12px;
    }
    .row {
        margin: 16px 0;
    }
    .full-height {
        height: 100%;
    }
</style>
