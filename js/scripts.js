/*!
* Start Bootstrap - Resume v7.0.5 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    const sideNav = document.getElementById('sideNav');
    if (sideNav && window.bootstrap) {
        new bootstrap.ScrollSpy(document.body, { target: '#sideNav', offset: 74 });
    }
    const navbarToggler = document.querySelector('.navbar-toggler');
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (!navbarToggler || window.getComputedStyle(navbarToggler).display === 'none' || !window.bootstrap) return;
            const panel = document.getElementById('navbarResponsive');
            const collapse = bootstrap.Collapse.getOrCreateInstance(panel, { toggle: false });
            if (panel.classList.contains('collapsing')) {
                panel.addEventListener('shown.bs.collapse', () => collapse.hide(), { once: true });
            } else {
                collapse.hide();
            }
        });
    });

    // Native buttons support pointer, Enter and Space; the iframe stays outside the button.
    document.querySelectorAll('.video-wrapper[data-video-id]').forEach(wrapper => {
        const image = wrapper.querySelector('img');
        const heading = wrapper.closest('.video')?.querySelector('.subheading');
        const title = (heading?.textContent || image?.alt || 'Vortrag').trim().replace(/\s+/g, ' ');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'video-start';
        button.setAttribute('aria-label', title + ' – Video abspielen');
        if (image) image.alt = '';
        wrapper.querySelector('.play-button')?.setAttribute('aria-hidden', 'true');
        button.append(...Array.from(wrapper.childNodes));
        wrapper.append(button);
        button.addEventListener('click', () => {
            const player = document.createElement('iframe');
            player.src = 'https://www.youtube.com/embed/' + encodeURIComponent(wrapper.dataset.videoId) + '?autoplay=1';
            player.title = title;
            player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            player.allowFullscreen = true;
            player.tabIndex = 0;
            wrapper.replaceChildren(player);
            player.focus();
        }, { once: true });
    });

    // Hidden removes closed content from tab order and the accessibility tree.
    function setupDisclosure(listId, buttonId, itemClass, wrapperClass, closedLabel) {
        const list = document.getElementById(listId);
        const button = document.getElementById(buttonId);
        if (!list || !button) return;
        const items = Array.from(list.children).filter(item => item.classList.contains(itemClass));
        if (items.length <= 6) return;
        const extra = document.createElement('div');
        extra.id = listId + '-extra';
        extra.className = wrapperClass;
        extra.append(...items.slice(6));
        list.append(extra);
        button.setAttribute('aria-controls', extra.id);
        const setOpen = open => {
            if (!open && extra.contains(document.activeElement)) button.focus();
            extra.hidden = !open;
            button.setAttribute('aria-expanded', String(open));
            button.querySelector('.label').textContent = open ? 'Weniger anzeigen' : closedLabel;
        };
        setOpen(false);
        button.hidden = false;
        button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    }
    setupDisclosure('news-list', 'news-toggle', 'news', 'news-collapsible', 'Weitere News');
    setupDisclosure('presentations-list', 'presentations-toggle', 'video', 'collapsible-grid', 'Weitere Vorträge');

    document.querySelectorAll('.accordion[aria-controls]').forEach(button => {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;
        button.addEventListener('click', () => {
            const open = button.getAttribute('aria-expanded') !== 'true';
            if (!open && panel.contains(document.activeElement)) button.focus();
            panel.hidden = !open;
            panel.style.display = open ? 'block' : 'none';
            button.classList.toggle('active', open);
            button.setAttribute('aria-expanded', String(open));
        });
    });
    function openPolicy() {
        const button = document.getElementById('datenschutz');
        if (button?.getAttribute('aria-expanded') === 'false') button.click();
    }
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#datenschutz') openPolicy();
    });
    document.addEventListener('click', event => {
        if (event.target.closest('a[href="#datenschutz"]')) openPolicy();
    });
    if (window.location.hash === '#datenschutz') openPolicy();
});
