import React from 'react';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {SetStateAction} from "react";
import {Dispatch} from "react";

type Props = {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

function SettingsModal({setShowModal}: Props) {


    return (
        <div>
            <div className='text-black dark:text-white w-full h-full bg-black/50 absolute top-0 right-0 z-10 flex items-center justify-center' >
                <div className='container bg-zinc-50 dark:bg-zinc-900 w-96 h-96 rounded-2xl z-30 relative'>
                    <h1 className='text-5xl font-semibold text-center mt-2'>Settings</h1>
                    <button onClick={() => setShowModal(false)}>
                        <FontAwesomeIcon icon={faTimes} size='2x' className='right-2 top-2 absolute' />
                    </button>
                    <div className='mt-2'>
                        <label htmlFor='colourPref' className='text-xl m-2'>Colour preference:</label>
                        <select id='colourPref' name='colour' defaultValue='Pick an option' className='bg-zinc-100 dark:bg-zinc-600' onChange={(e) => {
                            localStorage.setItem('colour', e.target.value);
                        }}>
                            <option value={""} disabled>Pick an option</option>
                            <option value='light'>Light</option>
                            <option value='dark'>Dark</option>
                            <option value='system'>System</option>
                        </select>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor='divisor' className='text-xl m-2'>Divisor:</label>
                        <input type='number' id='divisor' name='divisor' defaultValue={Number(localStorage.getItem('divisor')) === 0 ? 3 : Number(localStorage.getItem('divisor'))} className='bg-zinc-100 dark:bg-zinc-600' onChange={(e) => {
                            localStorage.setItem('divisor', e.target.value);
                        }} />
                        <p className='text-xs ml-2'>If you set the divisor to 0 itll automatically be set to the default (3)</p>
                    </div>
                    <div className='w-full flex h-20 justify-center items-center'>
                        <button className='bg-zinc-100 dark:bg-zinc-800 p-3 rounded-xl' onClick={() => window.location.reload()}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsModal;