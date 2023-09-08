import { useState, useEffect } from "react";
import { connect } from "react-redux";

const programRules = [{
    elements: ["enrollmentDate", "incidentDate"],
    expression: "[enrollmentDate] < [incidentDate]",
    message: "Enrollment Date should be greater than or equal Incident Date"
}, {
    elements: ["incidentDate", "dob"],
    expression: "[incidentDate] < [dob]",
    message: "Incident Date should be greater than or equal Birth Date"
}];

const useRuleEngine = ({ metadata, data }) => {

    const { formMapping } = metadata;
    const { currentTei, currentEnrollment } = data;

    const [rules, setRules] = useState([]);
    
    useEffect(() => {
        const convertedProgramRules = programRules.map( pr => {
            return {
                elements: pr.elements.map( field => ( field === "enrollmentDate" || field === "incidentDate" ) ? field : formMapping[field] ),
                expression: replaceExpression(pr.elements, pr.expression),
                message: pr.message
            }
        });
        setRules(convertedProgramRules);
    }, []);

    const replaceExpression = ( elements, expression ) => {
        let newExpression = expression;
        elements.forEach( field => {
            if ( field !== "enrollmentDate" && field !== "incidentDate" ) {
                newExpression = newExpression.replace( field, formMapping[field] )
            }
        })
        return newExpression;
    }

    const getValue = field => {
        if ( field === "enrollmentDate" || field === "incidentDate" ) {
            return currentEnrollment[field];
        }
        else {
            return currentTei.attributes[field];
        }
    }

    const evaluate = (elements, expression) => {
        let condition = expression;
        elements.forEach( e => {
            condition = condition.replace(`[${e}]`,getValue(e));
        });
        return eval(condition);
    }

    const runProgramRule = rule => {
        let actions = [];
        if ( evaluate(rule.elements,rule.expression) ) {
            actions = [...actions, ...rule.message];
        }
        return actions;
    }

    const run = () => {
        let currentActions = [];
        rules.forEach( rule => {
            const actions = runProgramRule(rule);
            currentActions = [...currentActions,...actions];
        })
        return currentActions;
    }

    return {
        run
    };
}

const mapStateToProps = (state) => {
    return {
        metadata: state.metadata,
        data: state.data
    };
};

export default connect(mapStateToProps)(useRuleEngine)