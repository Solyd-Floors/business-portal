import React from "react";
import { connect } from "react-redux";
import { setWithPanel } from "../sagas/components/ui/ui-saga"

class _WithoutPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        if (this.props.withPanel){
            this.props.setWithPanel(false);
        }
    }
    componentWillUnmount(){
        if (!this.props.withPanel){
            this.props.setWithPanel(true);
        }
    }
    render(){
        let Comp = this.props.children
        return <Comp {...this.props}/>
    }
}

export default connect(state => ({ withPanel: state.ui.withPanel}), { setWithPanel })(_WithoutPanel);

