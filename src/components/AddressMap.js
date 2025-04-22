export default function AddressMap({className}) {
    return (
        <div className={`${className} overflow-hidden`}>
            <iframe
                title="Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.316920891807!2d126.88659670000001!3d37.476847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b61e12ae97d57%3A0x2afff98ff6f0b179!2z7ZiE64yA7KeA7Iud7IKw7JeF7IS87YSwIOqwgOyCsO2NvOu4lOumrQ!5e0!3m2!1sko!2skr!4v1741242577148!5m2!1sko!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"/>
        </div>
    );
};