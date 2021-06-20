import React from "react";

export default class ListItem extends React.Component {
	/**
	 * 子コンポーネントから親に引数として値を渡す
	 * チェックしたtodoのidを親コンポーネントに渡す処理
	 *
	 * @param {*} e
	 */
	onChangeCheckBox(e) {
		this.props.onCompleteTodo(e.target.value);
	}

	render() {
		return (
			// mainArea(親コンポーネント)からstateの要素を取得するためにはpropsを使用する
			<li className="todo-item">
				<input
					type="checkbox"
					value={this.props.data.id}
					onChange={this.onChangeCheckBox.bind(this)}
				></input>
				{this.props.data.label}
			</li>
		);
	}
}
