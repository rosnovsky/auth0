import React, { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const AppRules = ({ appName }) => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const log = () => {
            const url = `https://${process.env.REACT_APP_TENANT_DOMAIN}/api/v2/rules`;
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
        if (rule.script.includes(appName)) {
            rulesToList.push(rule);
            return;
        }

        if (appName === 'All Applications') {
            rulesToList.push(rule);
            return;
        }
    });

    return rulesToList.length !== 0 ? (
        <>
            <ul>
                {rulesToList.map(rule => {
                    return (
                        <Collapsible
                            key={rule.name}
                            trigger={rule.name}
                            triggerStyle={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                lineHeight: '4rem',
                                borderBottom: '1px dotted',
                            }}
                        >
                            <small>
                                <a
                                    href={`https://manage.auth0.com/dashboard/us/${process.env.REACT_APP_TENANT}/rules/${rule.id}`}
                                >
                                    Edit this rule
                                </a>
                            </small>
                            <li>
                                <SyntaxHighlighter
                                    language="javascript"
                                    style={atomOneLight}
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
