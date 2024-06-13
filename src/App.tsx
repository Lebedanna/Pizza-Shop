import Button from "./components/Button/Button";
import {MouseEvent} from "react";
import Input from "./components/Input/Input.tsx";

function App() {

    const addCounter = (e: MouseEvent) => {
        console.log(e)
    }

    return (
        <>
            <Button onClick={addCounter}>Button</Button>
            <Button appearance='big' onClick={addCounter}>кнопка</Button>
            <Input placeholder='email'/>
        </>
    );
}

export default App;