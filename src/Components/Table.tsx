import './Styles/table.style.css'
import UI from './UI';
import Chip from './Chip';

export default function Table() {


    return (
            <main className="table--container table-texture">
                <Chip value="one"/>
                <Chip value="ten"/>
                <Chip value="twenty-five"/>
                <Chip value="fifty"/>
                <Chip value="hundred"/>
                <Chip value="five-hundred"/>
                <UI />

            </main>  
    )
}