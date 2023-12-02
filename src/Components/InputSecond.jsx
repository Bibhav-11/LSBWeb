import './Input.css'

export default function InputSecond({text, value, selectedValue, index}) {

    return (
        <input
            key={index}
            type="text"
            className='input'
            placeholder={text}
            value={value}
            onChange={(e) => {console.log(e.target.value);selectedValue(e.target.value, index)}}
          />
    )
}