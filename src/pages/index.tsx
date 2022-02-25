import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Layout from '../components/Layout';
import { useMain } from '../MainApplication/Provider';
import { Column } from '../../Types';
import ColumnItem from '../components/ColumnItem';

export const Home = () => {
    const [state, dispatch] = useMain();
    const onDragEnd = ({ draggableId, destination }: DropResult) => {
        if (!destination) return;
        dispatch.updateTaskColumn(draggableId, destination.droppableId);
    };

    return (
        <Layout>
            <div className="px-10 flex flex-col h-screen">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid grid-cols-4 gap-5 mb-5">
                        {state.columns.map((column: Column) => (
                            <ColumnItem key={column.id} column={column} />
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </Layout>
    );
};
export default Home;
