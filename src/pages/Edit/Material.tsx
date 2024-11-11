import { useDrag } from 'react-dnd'

type Props = {
    name: string
    type: string
}

function MaterialItem(props: Props) {
    const [_, drag] = useDrag({
        type: props.type,
        item: {
            type: props.type
        }
    })
    return <div className='material-item' ref={drag}>{props.name}</div>;
}

export default MaterialItem;