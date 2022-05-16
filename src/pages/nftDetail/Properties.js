function Properties(props) {
    const styles = {
        propertiesCover: {
            overflowY: 'auto',
            height: '300px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
        },
        propertyCover: {
            width:'28%',
            border: '1px solid #ff9817',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center'
        },
        propertyKey: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: '22px',
            textTransform: 'capitalize',
            color: 'rgb(81, 66, 252)',
        },
        propertyValue: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: '22px',
            textTransform: 'capitalize',
            color: 'white',
        },
        propertyRarity: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: '22px',
            textTransform: 'capitalize',
            color: 'white',
        }
    }
   
    return (
        <div style={styles.propertiesCover}>
            {
                props.data &&
                Object.entries(props.data).map((item) => (
                    <div style={styles.propertyCover}>
                        <p style={styles.propertyKey}>{item[0]}</p>
                        <p style={styles.propertyValue}>{item[1]}</p>
                        <p style={styles.propertyRarity}>Rarity: {}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default Properties