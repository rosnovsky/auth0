import React, { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const AppRules = ({ appName }) => {
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

    if (rules.length === 0) {
        return <div>Loading...</div>;
    }

    const rulesToList = [];

    rules.forEach(rule => {
        if (rule.script.includes(`${appName}`)) {
            rulesToList.push(rule);
        }
    });

    return rulesToList.length !== 0 ? (
        <>
            <p>Rules: </p>
            <ul>
                {rulesToList.map(rule => {
                    return (
                        <Collapsible
                            key={rule.name}
                            trigger={rule.name}
                            triggerStyle={{
                                fontSize: '1.6rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                lineHeight: '4rem',
                                marginBottom: '1rem',
                            }}
                        >
                            <li>
                                <SyntaxHighlighter
                                    language="javascript"
                                    style={monokai}
                                >
                                    {rule.script}
                                </SyntaxHighlighter>
                            </li>
                        </Collapsible>
                    );
                })}
            </ul>
        </>
    ) : (
        'No rules applied to this app'
    );
};

export default AppRules;
