export default function SearchForm ({ value, onSearch }) {
	return (
		<form>
			<label htmlFor="username">Nazwa użytkownika: </label>
			<input 
				type="text"
				id="username"
				name="username"
				value={value}
				onChange={(e) => onSearch(e.target.value)}
			/>
		</form>
	)
}