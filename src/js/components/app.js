import React from "react";
import MainArea from "./mainArea";
import SideArea from "./sideArea";

// Appコンポーネント
export default class App extends React.Component {
	render() {
		return (
			<div className="wrap">
				<SideArea />
				<MainArea />
			</div>
		);
	}
}
