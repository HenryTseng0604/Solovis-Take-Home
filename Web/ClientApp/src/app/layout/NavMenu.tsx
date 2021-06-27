import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <Menu fixed='top'>
                <Container>
                    <Menu.Item header>
                        Financial Forecasting
                        </Menu.Item>
                    <Menu.Item name='Portfolio' icon='chart bar' as={Link} to='/' />
                    <Menu.Item name='Projection' icon='chart line' as={Link} to='/projection' />
                </Container>
            </Menu>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}
