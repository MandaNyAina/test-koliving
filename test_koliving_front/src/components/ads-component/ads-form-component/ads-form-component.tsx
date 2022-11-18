import { useMutation } from '@apollo/client';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { CREATE_ADS } from '../../../graphql/ads/ads.mutation';
import { LOAD_ADS } from '../../../graphql/ads/ads.queries';
import { IRoom } from '../../../models/IRoom';

const AdsFormComponent = ({onHide}: {onHide:() => Promise<void>}): React.ReactElement => {
    const [title, setTitle] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [pictures, setPictures] = useState<string>('');
    const [surfaces, setSurfaces] = useState<number>(0);
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [createAds] = useMutation(CREATE_ADS);

    const changeRoomValue = (key: string, id: number, value: string | number | string[]): void => {
        const newRoom = rooms.map((room) => {return {...room}; });
        setRooms(newRoom.map((room, index) => {
            if (index === id) {
                (room as any)[key] = value;
            }
            room.surfaces = room.surfaces * 1;
            return room;
        }));
    };
    
    const addRoom = () => {
        setRooms([...rooms, {
            title: '',
            surfaces: 0,
            pictures: []
        }]);
    };

    const onSave = async () => {
        createAds({
            variables: {
                input: {
                    properties: {
                        title,
                        address,
                        surfaces,
                        pictures: pictures.split(','),
                        rooms,
                    }
                }
            },
            refetchQueries: [{query: LOAD_ADS}]
        });
        await onHide();
    };

    return (
        <div>
            <div>
                <div className="flex justify-content-between flex-wrap card-container purple-container">
                    <h2>Properties details </h2>
                </div>
                
                <div className="card">
                    <div className="field">
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="address">Address</label>
                        <input id="address" type="text" value={address} onChange={(e) => setAddress(e.currentTarget.value)}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="surface">Surface</label>
                        <input id="surface" type="number" value={surfaces} onChange={(e) => setSurfaces(e.currentTarget.value == '' ? 0 : parseFloat(e.currentTarget.value))}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                    </div>
                    <div className="field">
                        <label htmlFor="pictures">Link of pictures (Separated by ",")</label>
                        <input id="pictures" type="text" value={pictures} onChange={(e) => setPictures(e.currentTarget.value)}
                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                    </div>
                </div>
            </div>
            <div>
                <h2>Rooms details</h2>
                {
                    rooms.map((room, index) => {
                        return (
                            <div className="card" key={index} >
                                <div className="field">
                                    <label htmlFor={'title' + index}>Title</label>
                                    <input id={'title' + index} type="text" value={room.title} onChange={(e) => changeRoomValue('title', index, e.currentTarget.value)}
                                        className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                </div>
                                <div className="field">
                                    <label htmlFor={'surfaces' + index}>Surface</label>
                                    <input id={'surfaces' + index} type="number" value={room.surfaces} onChange={(e) => changeRoomValue('surfaces', index, e.currentTarget.value)}
                                        className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                </div>
                                <div className="field">
                                    <label htmlFor={'pictures' + index}>Link of pictures (Separated by ",")</label>
                                    <input id={'pictures' + index} type="text" value={room.pictures.join(',')} onChange={(e) => changeRoomValue('pictures', index, e.currentTarget.value.split(','))}
                                        className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                </div>
                                <hr />
                            </div>
                        );
                    })
                }
                <div className="card">
                    <div className="flex justify-content-between flex-wrap card-container purple-container">
                        <Button label='Create a new room' onClick={addRoom}></Button>
                        <Button label="Publish" onClick={onSave} className="p-button-rounded p-button-success" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdsFormComponent;