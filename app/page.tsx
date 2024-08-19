"use client"

import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { MdOutlinePostAdd } from 'react-icons/md';
import { PiClipboardText } from 'react-icons/pi';

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

const Parser: React.FC = () => {
  const [formats, setFormats] = useState<Format[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [data, setData] = useState<string | undefined>('');
  const [parsedData, setParsedData] = useState<{ name: string; length: number; value: any[] }[]>([]);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const getClipboardData = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (inputRef.current) {
        const input = inputRef.current;
        const start = input.selectionStart;
        const end = input.selectionEnd;

        // Insert the clipboard text at the current cursor position or replace selected text
        const newValue = input.value.slice(0, start) + text + input.value.slice(end);
        input.value = newValue;
        setData(newValue);

        handleParse(newValue);

        input.setSelectionRange(start + text.length, start + text.length); // Move cursor to the end of inserted text
      }
    } catch (error) {
      console.error('Failed to read clipboard contents: ', error);
    }
  }

  const handleContextMenu = async (event: React.MouseEvent<HTMLTextAreaElement>) => {
    event.preventDefault(); // Prevent the default context menu

    // Get clipboard data
    getClipboardData();
  };

  useEffect(() => {
    // Load formats from local storage
    const savedFormats = JSON.parse(localStorage.getItem('formats') || '[]');
    setFormats(savedFormats);
  }, []);

  const handleParse = (value?: string) => {
    console.log('value', value);
    setData(value);

    const format = formats.find(f => f.formatName === selectedFormat);
    if (!format) return;

    if (value) {
      const result = format.fields.map(field => ({
        name: field.name,
        length: field.length,
        value: ((value.slice(field.start - 1, field.end)).toString()).split(''),
      }));
      setParsedData(result);
    } else {
      setParsedData([]);
    }
  };

  return (
    <main className={`grid gap-6 min-h-screen flex-col items-center p-12 ${parsedData.length > 0 ? "grid-cols-[40%,auto]" : ""}`}>

      <div className="bg-[#dadada] w-full h-full">

        <div className='h-20 flex items-center justify-between bg-primary text-white px-6'>
          <h1 className='text-3xl font-bold text-center'>Data Parser</h1>
          <Link
            href='/formats/add'
            className='bg-blue-500 text-white px-4 py-2 my-4 rounded-md'
          >
            <span className='flex items-center justify-center gap-2'>Add Format <MdOutlinePostAdd /></span>
          </Link>

        </div>

        <div className='mt-24 px-6 w-full grid justify-center gap-6'>
          <div className='flex gap-2 items-center'>
            <label className=''>Select Format:</label>
            <select
              value={selectedFormat}
              onChange={(e) => {
                setSelectedFormat(e.target.value);
              }}
              onClick={() => handleParse(data)}
              className='w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            >
              <option value="">Select a format</option>
              {formats.map((format, index) => (
                <option key={index} value={format.formatName}>
                  {format.formatName}
                </option>
              ))}
            </select>
          </div>
          <div className='' >
            <textarea
              value={data}
              onChange={(e) => handleParse(e.target.value)}
              ref={inputRef}
              onContextMenu={handleContextMenu}
              // onContextMenu={(e) => {
              //   e.preventDefault();
              //   return false;
              // }}
              rows={5}
              cols={50}
              className='w-full p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            />
            <button
              onClick={() => getClipboardData()}
              className='bg-blue-500 text-white px-4 py-2 my-4 rounded-md'
            >
              <span className='flex items-center gap-2'><PiClipboardText /> Paste your Data</span>
            </button>
          </div>
          {/* <button onClick={handleParse}>Parse Data</button> */}

        </div>
      </div>

      {parsedData.length > 0 && (
        <div className="bg-[#dadada] w-full h-full">
          <div className='grid gap-2'>
            <div className='h-20 flex items-center justify-center bg-primary text-white px-6'>
              <h1 className='text-3xl font-bold text-center'>Parsed Data</h1>
            </div>
            <ul className='h-[calc(100vh-184px)] overflow-auto '>
              {parsedData.map((item, index) => (
                <li key={index}>
                  <div className='my-4 border border-primary-400'>
                    <div className='bg-primary-400 p-1 flex justify-center'>
                      <span className='text-white font-bold'>{item.name} ({item.length})</span>

                    </div>
                    <div className=' p-1 flex justify-center'>
                      {item.value.map((value, index) => (
                        <div key={index} className=' border-primary-700   w-8 text-center'>
                          <div className='bg-secondary text-white text-xs border-r'>{index + 1}</div>
                          <div className='border-r bg-white font-bold text-xl '>{value === " " ? <span>&nbsp;</span> : value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              ))}



            </ul>
          </div>

        </div>
      )}


    </main>
  );
};

export default Parser;

