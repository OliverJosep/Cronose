import React, { Component } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import Axios from "axios";
import { LocaleContext } from "../../../../contexts/LocaleContext";
import qs from "qs";
import { RenderChat, RenderChats } from "./Messages";
// import InfiniteScroll from 'react-infinite-scroll-component';

export default class Chat extends Component {
  static contextType = LocaleContext;
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      chats: [],
      chats_loaded: false,
      chat_selected: "",
      chat: [],
      chat_loaded: false,
      new_data: false,
      chatsLength: "10",
    };
    this.getChat = this.getChat.bind(this);
    this.getChats = this.getChats.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLastMessage = this.getLastMessage.bind(this);
    this.selectChat = this.selectChat.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
    this.getChatsInterval = this.getChatsInterval.bind(this);
    this.chatsMessage = this.chatsMessage.bind(this);
    this.newChat = this.newChat.bind(this);
  }

  componentDidMount() {
    this.newChat();
    this.getChats();
    this.chatsInterval = setInterval(this.getChatsInterval, 3000);
    this.chatsMessage();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    clearInterval(this.chatInterval);
    clearInterval(this.chatsInterval);
  }

  newChat() {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    if (id) this.getChat(id);
  }

  getChats() {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/chats/${this.context.user.id}`
    ).then((response) => {
      this.setState({
        chats: response.data.chats || this.state.chats,
        chats_loaded: true || false,
      });
    });
  }

  getChatsInterval() {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/chats/${this.context.user.id}`
    ).then((response) => {
      this.setState({
        chats: response.data.chats || this.state.chats,
        chats_loaded: true || false,
      });
    });
  }

  getChat(id) {
    Axios.get(
      `${process.env.REACT_APP_API_URL}/chat/${this.context.user.id}/${id}`
    ).then((response) => {
      !this.state.chat_selected &&
        (this.chatInterval = setInterval(this.getLastMessage, 500));
      this.setState({ chat_selected: id });
      this.setState(
        {
          chat: response.data || "this.state.chat",
          chat_loaded: true || false,
          new_data: true,
        },
        function () {
          this.scrollDown();
        }
      );
    });
    this.scrollDown();
  }

  selectChat = ({ currentTarget: { id } }) => {
    this.getChat(id);
    this.chatsMessage();
  };

  handleSubmit(e) {
    e.preventDefault();
    document.getElementById("send").value = "";
    if (this.state.message === "") return false;
    const list = this.state.chat.messages;
    let date = new Date();
    date =
      date.getFullYear() +
      "-" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    const newMessage = {
      sended: "1",
      sended_date: date,
      message: this.state.message,
    };
    Axios.post(
      `${process.env.REACT_APP_API_URL}/chat/${this.context.user.id}/${this.state.chat_selected}`,
      qs.stringify(newMessage)
    );
    list.push(newMessage);
    this.setState({ messages: list, new_data: true, message: "" }, function () {
      this.scrollDown();
    });
    this.getChats();
  }

  updateMessage(e) {
    this.setState({ message: e.target.value });
  }

  getLastMessage() {
    let chat = this.state.chat;
    if (this.state.chat_selected) {
      Axios.get(
        `${process.env.REACT_APP_API_URL}/chat/last/${this.context.user.id}/${this.state.chat_selected}`
      ).then((response) => {
        for (let i = 0; i < response.data.messages.length; i++) {
          if (
            response.data.messages[i].sended_date >
            chat.messages[chat.messages.length - 1].sended_date
          ) {
            chat.messages.push(response.data.messages[i]);
            this.setState({ chat: chat, new_data: true }, function () {
              this.scrollDown();
            });
          }
        }
      });
    }
  }

  scrollDown(now) {
    if (this.state.new_data || now) {
      var objDiv = document.getElementById("chat_box");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    this.setState({ new_data: false });
  }

  chatsMessage() {
    var objDiv = document.getElementById("user-chat");
    this.setState({ chatsLength: objDiv.scrollWidth / 15 });
  }

  render() {
    return (
      <>
        <h1 className="text-center mt-4">Chat</h1>
        <div className="container-fluid ">
          <div className="row card-chat mb-4">
            <div className="chats col-4 col-xl-3 p-1" id="user-chat">
              <div className="bg">
                {this.state.chats_loaded
                  ? this.state.chats.map((chat, index) => (
                      <RenderChats
                        user={chat.reciver}
                        message={chat.last}
                        selected={this.state.chat_selected}
                        selectChat={this.selectChat}
                        chatsLength={this.state.chatsLength}
                        key={index}
                      />
                    ))
                  : "Loading"}
              </div>
            </div>
            <div className="chat col-xl-6 col-8 p-1">
              {this.state.chat_loaded ? (
                <RenderChat
                  user={this.state.chat.receiver}
                  messages={this.state.chat.messages}
                  sendMessage={this.sendMessage}
                />
              ) : (
                "Loading"
              )}
              <form
                id="send_message"
                method="post"
                target="_self"
                className="w-100 row"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <div className="pr-1 col-xl-10 col-8">
                  <input
                    onChange={this.updateMessage.bind(this)}
                    id="send"
                    className="form-control"
                    type="text"
                    placeholder="Insert message here!"
                  />
                </div>
                <div className="pl-1 col-xl-2 col-4">
                  <input
                    className="btn w-100 text-white"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
            <div className="col-xl-3 col-12 p-1 cards">
              <div className="bg">
                <h3 className="w-100 p-2 pt-3 m-0">Cards</h3>
                <div className="row offer-card p-2">
                  <div className="col-6 text-center d-block d-md-none d-xl-block">
                    <img
                      className="m-auto"
                      src="/assets/img/img-work.jpg"
                      width="auto"
                      height="71px"
                      alt="img-work"
                    ></img>
                  </div>
                  <div className="col-6 col-md-12 col-xl-6 text-md-center text-xl-left">
                    <div className="row">
                      <div className="col-12 title">Job Title</div>
                      <div className="col-12">12/03/2020</div>
                      <div className="col-12">
                        <strong>Status:</strong> Pending
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row offer-card p-2">
                  <div className="col-6 text-center d-block d-md-none d-xl-block">
                    <img
                      className="m-auto"
                      src="/assets/img/img-work.jpg"
                      width="auto"
                      height="71px"
                      alt="img-work"
                    ></img>
                  </div>
                  <div className="col-6 col-md-12 col-xl-6 text-md-center text-xl-left">
                    <div className="row">
                      <div className="col-12 title">Job Title</div>
                      <div className="col-12">08/03/2020</div>
                      <div className="col-12">
                        <strong>Status:</strong> Accepted
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <MdAddCircleOutline className="add" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
