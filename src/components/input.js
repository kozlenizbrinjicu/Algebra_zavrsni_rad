import React from 'react';

class Input extends React.Component {
    state = {
        txt: '',
    };

    onChange(event) {
        this.setState({ txt: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ txt: '' });
        this.props.onSendMessage(this.state.txt);
    }
    render() {
        return (
            <div className="Input">
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <input
                        onChange={(event) => this.onChange(event)}
                        value={this.state.txt}
                        type="txt"
                        placeholder=" Hi, write something!"
                        autoFocus
                    />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}

export default Input;
