import { Routes, Route } from "react-router"
import { useContext, useEffect } from "react"
import { Alert } from "react-bootstrap"
import { UserContext } from "../../context/UserContext"

const PrivateRouter = (props) => {
    console.log(props);
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Bạn không có quyền cho route này.
                    </p>
                </Alert>
            </>
        )
    }
    
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRouter