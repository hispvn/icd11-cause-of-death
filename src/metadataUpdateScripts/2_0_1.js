const config = {
    baseURL: 'https://api.cod-capture.com',
    username: 'your_username',
    password: 'your_password',
    program: "your_program_id",
}

const metadataUpdatedDates = ["2025-05-05"]

const updateMetadata = async () => {
    const { data: { data: { programIndicators } } } = await axios.get(`${config.baseURL}/api/programIndicators?filter=program.id:eq:${config.program}`, {
        auth: {
            username: config.username,
            password: config.password,
        },
    });

    const updatedProgramIndicators = programIndicators.map(indicator => {
        return {
            ...indicator,
            filter: indicator.filter.replaceAll("V{enrollment_date}","V{incident_date}"),
        };
    });

    await axios.put(`${config.baseURL}/api/programIndicators`, { programIndicators: updatedProgramIndicators }, {
        auth: {
            username: config.username,
            password: config.password,
        },
    });
}