import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { Button, Container, Dropdown, FormField, Header, Label } from "semantic-ui-react";
import NumberFormat from "react-number-format";
import agent from "../app/api/agent";
import { Payload } from "../app/model/payload";

interface investmentOption {
    key: string,
    text: string,
    value: number
}

const Projection = () => {
    const [investmentOptions, setInvestmentOptions] = useState<investmentOption[]>([]);
    const term = {
        CurrentValue: '',
        AnnualizedReturn: '',
        NumberOfDays: ''
    }
    const initialResult = {
        Display: 'none',
        ProjectedValue: 0,
        ProjectedReturn: 0
    }
    const [result, setResult] = useState(initialResult);

    const validationSchema = Yup.object({
        CurrentValue: Yup.number().required('Please select an investment.'),
        AnnualizedReturn: Yup.number().required('Please enter the annualized rate of return.'),
        NumberOfDays: Yup.number().positive().integer().required('Please enter the number of days to project.')
    })

    useEffect(() => {
        agent.Investments.list().then(response => {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            setInvestmentOptions(response.map((investment) => ({
                key: investment.id,
                text: investment.label + ' : ' + formatter.format(investment.currentValue),
                value: investment.currentValue,
            })));
        })
    }, [])

    const handleFormSubmit = (values:any, {setSubmitting}:any) => {
        let payload:Payload = {
            Method: 'CumulativeReturn',
            Term: { ...values }
        }
        console.log(payload);
        agent.Projection.result(payload).then(response => {
            console.log(response);
            setResult({
                Display: 'inline',
                ProjectedValue: response.projectedValue,
                ProjectedReturn: response.projectedReturn
            });
        })
        setSubmitting(false);
    }

    return (
        <div>
            <Container style={{ marginTop: '4em' }}>
                <Header as='h2' icon='chart line' content='Projection' />
                <Formik
                    validationSchema={validationSchema}
                    initialValues={term}
                    onSubmit={handleFormSubmit}>
                    {({ setFieldValue, handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit}>
                            <FormField>
                                <label>Investment:</label>
                                <Dropdown
                                    name='CurrentValue'
                                    placeholder='Select investment'
                                    fluid
                                    search
                                    selection
                                    options={investmentOptions}
                                    onChange={(option, data) => setFieldValue("CurrentValue", data.value)}
                                />
                                <ErrorMessage name='CurrentValue' render={error => <Label basic color='red' content={error} />} />
                            </FormField>
                            <FormField>
                                <label>Annualized return:</label>
                                <Field
                                    fluid="true"
                                    name='AnnualizedReturn'
                                    placeholder='Example: 0.05'
                                />
                                <ErrorMessage name='AnnualizedReturn' render={error => <Label basic color='red' content={error} />} />
                            </FormField>
                            <FormField>
                                <label>Number of days to project:</label>
                                <Field
                                    fluid="true"
                                    name='NumberOfDays'
                                    placeholder='Number of days'
                                />
                                <ErrorMessage name='NumberOfDays' render={error => <Label basic color='red' content={error} />} />
                            </FormField>
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                positive type='submit' content='Project Return' />
                        </Form>
                    )}
                </Formik>
            </Container>
            <Container style={{ display: result.Display }}>
                <Label>Projected Value : <NumberFormat value={result.ProjectedValue} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} /></Label>
                <Label>Projected Return : <NumberFormat value={result.ProjectedReturn * 100} displayType={'text'} decimalScale={2} suffix={'%'} /></Label>
            </Container>
        </div>
    );
}

export default Projection;