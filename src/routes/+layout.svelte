<script lang="ts">
	import { page } from '$app/stores';
	$: path = $page.url.pathname;
</script>

<p>Experimenting sveltekit + <a href="https://dexie.org/"> dexie-indexedDB </a></p>
<nav>
	<a href="/" class:active={path === '/'}>Image upload</a>
	<a href="/other" class:active={path === '/other'}>other</a>
</nav>
<slot />
<footer>
	<a href="https://github.com/leovoon/kit-dexie">
		<img
			class="logo"
			width={20}
			height={20}
			src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
			alt="github link"
		/>
	</a> by leovoon
</footer>

<style>
	nav {
		display: flex;
		column-gap: 1em;
	}

	a.active {
		border: dotted rgb(241, 121, 185) 2px;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	footer > a {
		display: grid;
		place-items: center;
	}
</style>
