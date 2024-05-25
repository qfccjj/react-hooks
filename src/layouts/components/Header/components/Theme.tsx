import { Drawer, Tooltip } from "antd";
import { useState } from "react";

const Theme = () => {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Tooltip placement="bottom" title={"主题"}>
				<i
					className="icon-style iconfont icon-zhuti"
					onClick={() => {
						showDrawer();
					}}
				></i>
			</Tooltip>
			<Drawer title="主题设置" closable={false} onClose={onClose} visible={visible}>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Drawer>
		</>
	);
};
export default Theme;
