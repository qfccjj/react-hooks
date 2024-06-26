import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin } from "antd";
import type { MenuProps } from "antd";
import Logo from "./components/Logo";
import { getMenuList } from "@/api/modules/login";
import { getOpenKeys } from "@/utils/util";
import { connect } from "react-redux";
import { updateCollapse } from "@/redux/modules/menu/action";
import * as Icons from "@ant-design/icons";
import "./index.scss";

const LayoutMenu = (props: any) => {
	// 刷新页面菜单保持高亮
	const { pathname } = useLocation();
	// 当前选中的菜单项key数组
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	// 当前展开的subMenu菜单项key数组
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	useEffect(() => {
		setSelectedKeys([pathname]);
		props.isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, props.isCollapse]);

	// 设置当前展开的 subMenu
	const onOpenChange = (openKeys: string[]) => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		// 最新展开的 SubMenu
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};
	// 定义 menu 类型
	type MenuItem = Required<MenuProps>["items"][number];
	const getItem = (label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[], type?: "group"): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type
		} as MenuItem;
	};

	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(false);
	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data } = await getMenuList();
			data && setMenuList(deepLoopFloat(data));
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		getMenuData();
	}, []);

	// 点击当前菜单跳转
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		navigate(key);
	};

	// 动态渲染 Icon
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return React.createElement(customIcons[name]);
	};

	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList.forEach((item: Menu.MenuOptions) => {
			// 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		});
		return newArr;
	};

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo></Logo>
				<Menu theme="dark" mode="inline" triggerSubMenuAction="click" openKeys={openKeys} selectedKeys={selectedKeys} items={menuList} onClick={clickMenu} onOpenChange={onOpenChange}></Menu>
			</Spin>
		</div>
	);
};

const mapDispatchToProps = { updateCollapse };
const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
