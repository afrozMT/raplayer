import { h, Component } from "preact";
import { actions } from "../../actions";
import { namespaceConnect } from "@utils/enhancer";
import style from "./index.scss";
import filterImage from "images/filter.svg";
import MultiSelectDropdown from "@components/MultiSelectDropdown";

class FilterContainer extends Component {
	constructor(props) {
		super(props);
		this.onOptionsChangedHandler = this.onOptionsChangedHandler.bind(this);
		this.getOptionsFromEvalParams = this.getOptionsFromEvalParams.bind(this);
		this.onFilterClickHandler = this.onFilterClickHandler.bind(this);
		this.hideFilters = this.hideFilters.bind(this);
		this.state = {
			showFilters: false,
		};
	}

	onOptionsChangedHandler(selectedOptions) {
		// this.props.updateSearchKeywordsFromParams({ selectedEvalParams: selectedOptions });
		window.console.log(String(selectedOptions));
	}

	getOptionsFromEvalParams(evalParams) {
		let options = evalParams.map((evalParam) => { 
			return { label: evalParam.name, value: evalParam.evalParamId } 
		});
		return options;
	}

	onFilterClickHandler() {
		this.setState({ showFilters: !this.state.showFilters });
	}

	hideFilters() {
		this.setState({ showFilters: false });
	}

	render() {
		let dropdownOptions = this.getOptionsFromEvalParams(this.props.evalParams);
		return (
			<div className={style.selectFilter} onBlur={this.hideFilters}>
				<div className={style.filterIconHolder} onClick={this.onFilterClickHandler}>
					<img src={filterImage} style="height:15px;" />
				</div>
				<div style={{ ...!this.state.showFilters ? { display: 'none' } : { display: 'block' }, width: '300px' }}>
					<MultiSelectDropdown
						options={dropdownOptions}
						onOptionsChangedHandler={this.onOptionsChangedHandler}
					/>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
		evalParams: state.app.evaluationParameters
	};
}

export default namespaceConnect(mapStateToProps, actions)(FilterContainer);