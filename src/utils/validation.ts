/**
 * только русские и английские буквы + цифры и длинна от 2 до 20 символов
 * @param login  
 * @returns boolean
 */
export const nameValidate = (login: string) => {
    return /^[А-ЯA-Z0-9._%+-]{2,20}/i.test(login) 
} 

/**
 * Проверка корректности почты
 * @param email  
 * @returns boolean
 */
export const emailValidate = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(email) 
} 

/**
 * только английские буквы + цифры и длинна от 4 до 10 символов
 * @param pass 
 * @returns boolean
 */
export const passValidate = (pass: string) => {
    return /^[A-Z0-9._%+-]{4,10}/i.test(pass)
}