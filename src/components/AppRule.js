import React, { useState, useEffect } from 'react';

const AppRule = () => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const log = () => {
            const url = `https://${process.env.REACT_APP_TENANT}/api/v2/rules`;
            const bearer = `Bearer ${process.env.REACT_APP_API_MANAGEMENT_TOKEN}`;
            fetch(url, {
                method: 'GET',
                withCredentials: true,
                credentials: 'include',
                headers: {
                    Authorization: bearer,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setRules(data);
                })

                .catch(error => console.log(error));
        };
        log();
    }, []);

    if (!rules) {
        return <div>Loading...</div>;
    }

    console.log(rules);

    return (
        <>
            <p>Rules: </p>
            <ul>
                {rules.map(rule => (
                    <li key={rule.name}>{rule.name}</li>
                ))}
            </ul>
        </>
    );
};

export default AppRule;
