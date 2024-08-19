"use client";

import React, { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { IoIosAdd, IoIosSave } from 'react-icons/io';

type Field = {
    name: string;
    start: number;
    end: number;
    length: number;
};

type Format = {
    formatName: string;
    fields: Field[];
};

const AddFormat = () => {

    const [formatName, setFormatName] = useState<string>('');
    const [fields, setFields] = useState<Field[]>([{ name: '', start: 1, end: 1, length: 1 }]);

    const handleFieldChange = (index: number, field: Partial<Field>) => {
        const newFields = [...fields];
        const currentField = { ...newFields[index], ...field };

        if (field.name !== undefined) {
            currentField.name = field.name;
            newFields[index] = currentField;
            setFields(newFields);
        };

        // Automatically adjust the end based on the start and length
        if (field.length !== undefined) {
            currentField.end = currentField.start + currentField.length - 1;
            newFields[index] = currentField;
            setFields(newFields);
        };

        // Automatically adjust the length based on the start and end
        if (field.start !== undefined || field.end !== undefined) {
            currentField.length = (currentField.end - currentField.start) + 1;
            newFields[index] = currentField;
            setFields(newFields);
        };
    }

    const addField = () => {
        const lastField = fields[fields.length - 1];
        const newStart = lastField ? lastField.end + 1 : 0;

        setFields([...fields, { name: '', start: newStart, end: newStart, length: 1 }]);
    };

    const handleFieldDelete = (index: number) => {
        console.log('delete', index);
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const saveFormat = () => {
        const newFormat: Format = { formatName, fields };

        // Save to local storage
        const savedFormats = JSON.parse(localStorage.getItem('formats') || '[]');
        savedFormats.push(newFormat);
        localStorage.setItem('formats', JSON.stringify(savedFormats));

        // Reset the form
        setFormatName('');
        setFields([{ name: '', start: 0, length: 0, end: 0 }]);
        alert('Format saved successfully!');
    };

    return (
        <div className='w-full grid'>
            <div className='bg-primary px-12 flex justify-between'>
                <h1 className='text-white text-3xl font-bold text-center p-6'>Add New Format</h1>
                <button
                    onClick={saveFormat}
                    className='bg-secondary text-white px-4 py-2 my-4 rounded-md'
                >
                    <span className='flex items-center justify-center gap-2'>Save Format <IoIosSave /></span>
                </button>
            </div>
            <div className='w-full grid gap-6 px-24 py-12'>
                <div className='flex gap-2 p-4 items-center justify-center'>
                    <label htmlFor="format" className='w-28'>Format Name</label>
                    <input
                        required
                        id='format'
                        type="text"
                        placeholder="Enter format name here"
                        value={formatName}
                        onChange={(e) => setFormatName(e.target.value)}
                        className='w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                <div className='border border-secondary rounded-md pb-4'>

                    <h2 className='text-xl bg-secondary text-white rounded-t-md p-2 font-bold'>Fields</h2>
                    {fields.map((field, index) => (
                        <div key={index} className='grid grid-cols-[2rem,6rem,auto,6rem,6rem,6rem,6rem,4rem,6rem,2rem] gap-2 items-center py-6 px-2'>
                            <div className='text-xl font-bold'>{index + 1})</div>
                            <label htmlFor={`field-${index+1}`}>Field Name</label>
                            <input
                                required
                                id={`field-${index+1}`}
                                type="text"
                                placeholder="Field Name"
                                value={field.name}
                                onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                                autoComplete='off'
                                className='w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                            />
                            <label htmlFor={`length-start-${index+1}`}>Length Start</label>
                            <input
                                required
                                id={`length-start-${index+1}`}
                                type="number"
                                min={fields[index - 1] ? fields[index - 1].end + 1 : 1}
                                max={fields[index].end}
                                placeholder="Start"
                                value={field.start}
                                onChange={(e) => handleFieldChange(index, { start: Number(e.target.value) })}
                                className='w-24 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                            />
                            <label htmlFor={`length-end-${index+1}`}>Length End</label>
                            <input
                                required
                                id={`length-end-${index+1}`}
                                type="number"
                                min={fields[index].start}
                                placeholder="End"
                                value={field.end}
                                onChange={(e) => handleFieldChange(index, { end: Number(e.target.value) })}
                                className='w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                            />
                            <label htmlFor={`length-${index+1}`}>Length</label>
                            <input
                                required
                                id={`length-${index+1}`}
                                type="number"
                                placeholder="Length"
                                value={field.length}
                                onChange={(e) => handleFieldChange(index, { length: Number(e.target.value) })}
                                className='w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                            />
                            <button
                                className='bg-red-500 text-white rounded-full p-2'
                                onClick={(e) => handleFieldDelete(index)}>
                                <HiXMark />
                            </button>
                        </div>
                    ))}
                    <div className='w-full flex items-center justify-center'>

                        <button
                            onClick={addField}
                            className='bg-blue-500 text-white rounded-full m-2 px-8 py-2'
                        >
                            <span className='flex items-center justify-center gap-2 text-white'><IoIosAdd className='text-2xl' /> Add New Field</span></button>
                    </div>
                </div>


            </div>
        </div>
    );

};
export default AddFormat


