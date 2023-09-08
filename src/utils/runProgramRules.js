const programRules = [{
    elements: ["enrollmentDate", "incidentDate"],
    expression: "[enrollmentDate] < [incidentDate]",
    message: "Enrollment Date should be greater than or equal Incident Date"
}, {
    elements: ["incidentDate", "dob"],
    expression: "[incidentDate] < [dob]",
    message: "Incident Date should be greater than or equal Birth Date"
}];

const replaceExpression = ( elements, expression, formMapping ) => {
    let newExpression = expression;
    elements.forEach( field => {
        if ( field !== "enrollmentDate" && field !== "incidentDate" ) {
            newExpression = newExpression.replace( field, formMapping[field] )
        }
    })
    return newExpression;
}

const initProgramRules = formMapping => programRules.map( pr => {
    return {
        elements: pr.elements.map( field => ( field === "enrollmentDate" || field === "incidentDate" ) ? field : formMapping[field] ),
        expression: replaceExpression(pr.elements, pr.expression, formMapping),
        message: pr.message
    }
});

export const runProgramRule = () => {
    let currentActions = [];
    rules.forEach( rule => {
        const actions = runProgramRule(rule);
        currentActions = [...currentActions,...actions];
    })
    return currentActions;
}