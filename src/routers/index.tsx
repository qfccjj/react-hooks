import { useRoutes, Navigate } from "react-router-dom";
import { RouteObject } from "@/routers/interface";

// * login 和 layout 没必要使用懒加载
import Login from "@/views/login/index";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");
console.log(metaRouters);

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...routerArray
];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
