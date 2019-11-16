import React, { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import axios from 'axios';
import styled from 'styled-components';

const StyledList = styled.ul`
    list-style-image: url('../ul-bullet.png');
    line-height: 2rem;
    margin: 0 auto;
`;

const AppRules = ({ appName }) => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        const log = async () => {
            const url = `https://${process.env.REACT_APP_TENANT_DOMAIN}/api/v2/rules`;
            const bearer = `Bearer ${process.env.REACT_APP_API_MANAGEMENT_TOKEN}`;
            const data = await axios({
                method: 'get',
                url: url,
                headers: { Authorization: bearer },
            });
            setRules(data.data);
        };
        log();
    }, []);

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
            <StyledList>
                {rulesToList.map(rule => {
                    return (
                        <li key={rule.id}>
                            <Collapsible
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
                                <SyntaxHighlighter
                                    language="javascript"
                                    style={atomOneLight}
                                >
                                    {rule.script}
                                </SyntaxHighlighter>
                            </Collapsible>
                        </li>
                    );
                })}
            </StyledList>
        </>
    ) : (
        'No rules applied to this app'
    );
};

export default AppRules;
