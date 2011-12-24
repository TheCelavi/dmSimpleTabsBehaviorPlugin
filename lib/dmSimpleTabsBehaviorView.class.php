<?php
/**
 * @author TheCelavi
 */
class dmSimpleTabsBehaviorView extends dmBehaviorBaseView {
    
    public function configure() {
        $this->addRequiredVar(array('theme', 'titles', 'event', 'animation', 'duration', 'easing'));
    }

    protected function filterBehaviorVars(array $vars = array()) {
        $vars = parent::filterBehaviorVars($vars); 
        if (isset($vars['titles'])) $vars['titles'] = explode(';', $vars['titles']);
        else $vars['titles'] = array();
        return $vars;
    }
    
    public function getJavascripts() {
        return array_merge(
            parent::getJavascripts(),            
            array(
                'lib.easing',                
                'dmSimpleTabsBehaviorPlugin.launch'
            )
        );
    } 
    
    public function getStylesheets() {
        return array_merge(
            parent::getStylesheets(),
            array(
                'dmSimpleTabsBehaviorPlugin.themes'
            )
        );
    }
}

