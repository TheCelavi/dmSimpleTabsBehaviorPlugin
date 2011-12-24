<?php
/**
 * @author TheCelavi
 */
class dmSimpleTabsBehaviorForm extends dmBehaviorBaseForm {
    
    protected $animation = array(
        'none'=>'None',
        'slide'=>'Slide down',
        'show' => 'Slide corner',
        'fade'=>'Fade'
    );
    
    protected $event = array(
        'click'=>'Mouse click',
        'mouseover'=>'Mouse over'
    );
    
    protected $theme = array(
        'dark' => 'Dark',
        'light' => 'Light'
    );


    public function configure() {
        
        $this->widgetSchema['inner_target'] = new sfWidgetFormInputText();
        $this->validatorSchema['inner_target'] = new sfValidatorString(array(
            'required' => false
        ));
        
        $this->widgetSchema['theme'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->theme)
        ));
        $this->validatorSchema['theme'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->theme)
        ));
        
        $this->widgetSchema['titles'] = new sfWidgetFormInputText();
        $this->validatorSchema['titles'] = new sfValidatorString(array(
            'required' => true
        ));
        
        $this->widgetSchema['event'] = new sfWidgetFormChoice(array(
            'choices'=>$this->getI18n()->translateArray($this->event)
        ));
        $this->validatorSchema['event'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->event)
        ));
        
        $this->widgetSchema['animation'] = new sfWidgetFormChoice(array(
            'choices'=> $this->getI18n()->translateArray($this->animation)
        ));
        $this->validatorSchema['animation'] = new sfValidatorChoice(array(
            'choices'=>  array_keys($this->animation)
        ));
        
        $this->widgetSchema['duration'] = new sfWidgetFormInputText();
        $this->validatorSchema['duration'] = new sfValidatorInteger(array(
            'min'=>0
        )); 
        
        $this->widgetSchema['easing'] = new dmWidgetFormChoiceEasing();
        $this->validatorSchema['easing'] = new dmValidatorChoiceEasing(array(
            'required' => true
        ));
        
        $this->getWidgetSchema()->setLabels(array(
            'titles' => 'Tab titles'
        ));
        
        $this->getWidgetSchema()->setHelps(array(
            'titles'=>'Enter tab titles separated with semicolon (;)',
            'duration' => 'Duration of the animation in ms'
        )); 
        if (!$this->getDefault('theme')) $this->setDefault ('theme', 'dark');
        if (!$this->getDefault('event')) $this->setDefault ('event', 'click');
        if (!$this->getDefault('animation')) $this->setDefault ('animation', 'fade');
        if (!$this->getDefault('easing')) $this->setDefault ('easing', 'jswing');
        if (!$this->getDefault('duration')) $this->setDefault ('duration', 500);
        
        
        parent::configure();
    }
    
}

