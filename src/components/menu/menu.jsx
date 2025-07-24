import Button from 'react-bootstrap/Button';
import ShowRulesButton from '../rule/showrule'


export default function Menu({stateScreen}) {
    return (
        <div>
            <h1 className = "nameapp"> ПАЛОЧКИ</h1>
            <Button className = "playbut mx-auto d-block" size = "lg" onClick={() => stateScreen('setings')}>Играть</Button>
            <div>
                <ShowRulesButton />
            </div>
        </div>
    );
}
