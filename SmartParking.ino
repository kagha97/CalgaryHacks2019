//set up hardware
const int RED_LED = 9;
const int GREEN_LED = 10;
const int BLUE_LED = 11;
const int LIGHT_PIN = A1;
const int IR_SENSOR = 6;

int lightValue = 0;

void setup()
{
	Serial.begin(9600);

    //set up output
    pinMode(RED_LED, OUTPUT);
    pinMode(GREEN_LED, OUTPUT);
    pinMode(BLUE_LED, OUTPUT);

    //set up input
    pinMode(IR_SENSOR, INPUT);
}

void loop()
{
    
    delay(1000);
}

//set green light
void setGreen() {
    analogWrite(RED_LED, 0);
    analogWrite(GREEN_LED, 255);
    analogWrite(BLUE_LED, 0);
}


//set red light
void setRed() {
    analogWrite(RED_LED, 255);
    analogWrite(GREEN_LED, 0);
    analogWrite(BLUE_LED, 0);
}

//function to determine change in light value
bool hasCarPased(int lightValue = 0) {
    if (lightValue != 1) {
        return true;
    }
    return false;
}