import { gql } from "apollo-boost"

export const login = gql`
mutation Login(
        $email: String!, 
        $password: String!, 
        $public_ip: String, 
        $device: String, 
        $mac_adress: String, 
        $system_name: String
        ) 
    {
    Login(
        email: $email
        password: $password
        public_ip: $public_ip
        device: $device
        mac_adress: $mac_adress
        system_name: $system_name
        ) {
        id
        username
        email
        first_name
        last_name
        birthday
        executive
    }
}
`