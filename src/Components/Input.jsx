import './Input.css'

export default function Input({text, value, selectedValue}) {

    return (
        <input
            type="text"
            className='input'
            placeholder={text}
            value={value}
            onChange={(e) => selectedValue(e.target.value)}
          />
    )
}