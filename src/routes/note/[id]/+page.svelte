<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    </script>

<div class="sm:w-2/3 mx-auto">
    <p>
        {data.note.text}
    </p>

    <div class="my-4">
        {#each data.note.tags as t}
            <span class="rounded m-1 px-2 py-1 bg-slate-100" >
                {t}
            </span>
        {/each}
    </div>
</div>