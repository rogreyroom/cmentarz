<template>
    <aside>
        <div class="navBar">
            <ul class="aside-menu">
                <li>
                    <router-link to="/raporty/nieOplacone">
                        Nie opałacone
                    </router-link>
                </li>
                <li>
                    <router-link to="/raporty/osobyZmarle">
                        Osoby zmarłe
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>

<style>

.navBar {
    background-color: rgba(36, 36, 36, 0.925)
}

aside {
    margin-left: 0;
    width: 15%;
    display: inline-block;
    float: left;
}

.aside-menu {
    list-style: none;
    margin: 0;
    padding: 0;
    margin-left: 1em;
}

.aside-menu li {
    margin: 0;
    padding: 0.5em;
}

.menu a {
    text-decoration: none;
}

.menu button {
    margin: 0;
}

</style>

