import React from "react";
import Header from "./header";
import Footer from "./footer";
import ListItem from "./listItem";

// mainAreaコンポーネント
export default class MainArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [
				{ id: "item-1", label: "Todo1", completed: false },
				{ id: "item-2", label: "Todo2", completed: false },
				{ id: "item-3", label: "Todo3", completed: false },
				{ id: "item-4", label: "Todo4", completed: false },
			],
			// todo-inputで入力された要素を保持するstate
			todoInputValue: "",
		};
	}

	onChangeTodoInput(event) {
		// todo-inputで入力された値でstateを更新する
		this.setState({ todoInputValue: event.target.value });
		//console.log(event.target.value);
	}

	/**
	 * ListItem（子コンポーネント）から要素を取得
	 *
	 * @param {*} data
	 */
	onCompleteTodo(id) {
		// 現状のstate状態をコピー
		let _state = Object.assign({}, this.state);
		for (var i = 0; i < _state.todos.length; i++) {
			// チェックされたidと保持しているstate.todoのidが等しい場合
			if (_state.todos[i].id === id) {
				_state.todos[i].completed = true;
				break;
			}
		}
		// 新しいstateの状態を保存する
		this.setState(_state);
	}

	/**
	 * state.todosの要素を順番に配列に入れて出力する関数
	 *
	 * @returns
	 */
	renderTodoItems() {
		// elementを格納する配列
		let todoItemDom = [];

		for (var i = 0; i < this.state.todos.length; i++) {
			// completed:false、todoとして完了していない要素のみを表示する
			if (!this.state.todos[i].completed) {
				// 各elementをforで回して入れる
				// keyを作成それぞれのelementがユニークなものになり正しく区別されるようになる
				// 親コンポーネントから子コンポーネントに値を渡すためにdataを作成
				let todoItem = (
					<ListItem
						key={"item-" + i}
						data={this.state.todos[i]}
						onCompleteTodo={this.onCompleteTodo.bind(this)}
					/>
				);
				todoItemDom.push(todoItem);
			}
		}
		return todoItemDom;
	}

	/**
	 * onChangeTodoInput()でsetされた要素がtodosの配列の要素に追加される
	 *
	 * @param {*} event
	 */
	onClickAddButton(event) {
		const id = this.state.todos.length + 1;
		let addItem = {
			id: "item-" + id,
			label: this.state.todoInputValue,
			completed: false,
		};

		this.state.todos.push(addItem);

		this.setState({ todos: this.state.todos, todoInputValue: "" });
		console.log(this.state.todos);
	}

	render() {
		return (
			<div className="main-area">
				<Header />
				<main className="list-area">
					<div className="todo-input-area">
						<input
							type="text"
							className="todo-input"
							placeholder="Todoを追加"
							value={this.state.todoInputValue}
							onChange={this.onChangeTodoInput.bind(this)}
						/>
						{/* onClickはメソッドにmethod()カッコを付けない　()をつけるとクリックしたときではなく常時メソッドが呼ばれるため */}
						{/* bindを使用し、thisを固定する */}
						<button
							className="add-button"
							onClick={this.onClickAddButton.bind(this)}
						>
							登録
						</button>
					</div>
					<ul className="todo-list">{this.renderTodoItems()}</ul>
				</main>
				<Footer />
			</div>
		);
	}
}
