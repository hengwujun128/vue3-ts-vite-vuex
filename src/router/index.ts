import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

function getRoutes() {
	// const { routes } = loadRouters();
  const routes = loadRoutersHandler()
	/**
	 * 如果要对 routes 做一些处理，请在这里修改
	 */
	return routes;
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: getRoutes()
})

// router.beforeEach((to, from, next) => {
// 	next()
// })

export default router;

/** 以下代码不要修改 */
function loadRouters() {
	const context = import.meta.globEager("../views/**/*.vue");
    const routes: RouteRecordRaw[] = [];
    console.log('----context----:', context)
    Object.keys(context).forEach((key: any) => {
      if (key === "./index.ts") return;
      let name = key.replace(/(\.\.\/views\/|\.vue)/g, '');
      let path = "/" + name.toLowerCase();
      if (name === "Index") path = "/";
      routes.push({
        path: path,
        name: name,
        component: () => import(`../views/${name}.vue`)
      })
    });
    console.log('----routes----:', routes)
    return { context, routes }
}
/**
 *  上面的写法有些脆弱性，如果一个path 不是 一个文件，而是一个文件夹就解析有问题
 * 
 */
function loadRoutersHandler() {
  const routers = [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/todoList',
      name: 'TodoList',
      component:() => import('@/views/todoList/Index.vue')
    }
  ]
  return routers
}