import React from "react";
import ReactDOM from "react-dom";

class Popup extends React.Component<React.PropsWithChildren<{}> ,{}> {
    el: HTMLDivElement;
    constructor(props: React.PropsWithChildren<{}>) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

export default Popup;