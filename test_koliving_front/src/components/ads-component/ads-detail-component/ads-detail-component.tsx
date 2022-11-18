import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { LOAD_ADS_BY_ID } from '../../../graphql/ads/ads.queries';
import { Skeleton } from 'primereact/skeleton';
import { IRoom } from '../../../models/IRoom';
import { Button } from 'primereact/button';
import { UPDATE_ADS } from '../../../graphql/ads/ads.mutation';

const AdsDetailComponent = (): React.ReactElement => {
    const params = useParams();
    const [title, setTitle] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [surfaces, setSurfaces] = useState<number>(0);
    const [pictures, setPictures] = useState<string>('');
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const { error, loading, data} = useQuery(LOAD_ADS_BY_ID, {variables: {
        _id: params.id,
    }});
    const [updateAds] = useMutation(UPDATE_ADS);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    
    const changeRoomValue = (key: string, id: number, value: string | number | string[] ): void => {
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

    const onSave = () => {
        updateAds({
            variables: {
                input: {
                    _id: params.id,
                    properties: {
                        _id:  data.getAdsById.properties._id,
                        title,
                        address,
                        surfaces,
                        pictures: pictures.split(','),
                        rooms,
                    }
                }
            }
        });
        setIsEdit(false);
    };

    useEffect(() => {
        if (data !== undefined) {
            setTitle(data.getAdsById.properties.title);
            setAddress(data.getAdsById.properties.address);            
            setSurfaces(parseFloat(data.getAdsById.properties.surfaces));
            setRooms(data.getAdsById.properties.rooms);
            setPictures(data.getAdsById.properties.pictures.join(','));
        }
        if (error) {
            console.log(error);   
        }
    }, [data]);

    return (
        <div>
            {loading && <div className="field col-12 md:col-6">
                <Skeleton className="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="10rem" className="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="5rem" borderRadius="16px" className="mb-2"></Skeleton>
                <Skeleton height="2rem" className="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
            </div>}
            {!loading && <div>
                <div>
                    <div className="flex justify-content-between flex-wrap card-container purple-container">
                        <h2>Properties details </h2>
                        <Button onClick={() => setIsEdit(!isEdit)} label={isEdit ? 'View' : 'Edit'} />
                    </div>
                    
                    <div className="card">
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <input disabled={!isEdit} id="title" type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div className="field">
                            <label htmlFor="address">Address</label>
                            <input disabled={!isEdit} id="address" type="text" value={address} onChange={(e) => setAddress(e.currentTarget.value)}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div className="field">
                            <label htmlFor="surface">Surface</label>
                            <input disabled={!isEdit} id="surface" type="number" value={surfaces} onChange={(e) => setSurfaces(parseFloat(e.currentTarget.value))}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div className="field">
                            <label htmlFor="pictures">Link of pictures (Separated by ",")</label>
                            <input disabled={!isEdit} id="pictures" type="text" value={pictures} onChange={(e) => setPictures(e.currentTarget.value)}
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
                                        <input disabled={!isEdit} id={'title' + index} type="text" value={room.title} onChange={(e) => changeRoomValue('title', index, e.currentTarget.value)}
                                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor={'surfaces' + index}>Surface</label>
                                        <input disabled={!isEdit} id={'surfaces' + index} type="number" value={room.surfaces} onChange={(e) => changeRoomValue('surfaces', index, e.currentTarget.value)}
                                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor={'pictures' + index}>Link of pictures (Separated by ",")</label>
                                        <input disabled={!isEdit} id={'pictures' + index} type="text" value={room.pictures.join(',')} onChange={(e) => changeRoomValue('pictures', index, e.currentTarget.value.split(','))}
                                            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                                    </div>
                                    <hr />
                                </div>
                            );
                        })
                    }
                    {isEdit && <div className="card">
                        <div className="flex justify-content-between flex-wrap card-container purple-container">
                            <Button label='Create a new room' onClick={addRoom}></Button>
                            <Button label="Save" onClick={onSave} className="p-button-rounded p-button-success" />
                        </div>
                    </div>}
                </div>
            </div>}
        </div>
    );
};

export default AdsDetailComponent;