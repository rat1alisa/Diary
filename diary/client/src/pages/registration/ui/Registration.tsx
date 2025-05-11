import { RegistrationForm } from '@features/auth/ui/RegistrationForm'
import { WeatherInfo } from '@features/weather/WeatherInfo'

export default function RegistrationPage() {
  return (
    <div>
      <h1>Registration</h1>
      <WeatherInfo city="Москва" />
    </div>
  )
}