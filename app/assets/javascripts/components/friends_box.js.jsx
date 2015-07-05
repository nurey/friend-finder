var Friend = React.createClass({
  render: function() {
    return (
      <div className="friend">
        <h2 className="name">
          {this.props.name}
        </h2>
      </div>
    );
  }
});


var FriendList = React.createClass({
  render: function() {
    var friendNodes = this.props.data.map(function (friend) {
      return (
        <Friend name={friend.name} full={friend}>
        </Friend>
      );
    });

    return (
      <div className="friendList">
        {friendNodes}
      </div>
    );
  }
});

var FriendForm = React.createClass({
  handleChange: function(e) {
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();

    this.props.onFriendChange({
      name: name
    });
  },

  render: function() {
    return (
      <form className="friendForm">
        Name:
        <input type="text" ref="name" onChange={this.handleChange}/>
      </form>
    );
  }
});

var FriendBox = React.createClass({
  loadFriendsFromServer: function(formData) {
    $.get(this.props.url, formData, function(data) {
      this.setState({ data: data.friends });
    }.bind(this));
  },

  onFriendChange: function(formData) {
    this.loadFriendsFromServer(formData);
  },

  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function() {
    this.loadFriendsFromServer({});
  },

  render: function() {
    return (
      <div className="friendBox">
        <h1>Friend Finder</h1>
        <FriendForm onFriendChange={this.onFriendChange} />
        <FriendList data={this.state.data} />
      </div>
    );
  }
});
