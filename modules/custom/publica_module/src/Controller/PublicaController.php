<?php 

namespace Drupal\publica_module\Controller;

use Symfony\Component\HttpFoundation\Response;

class PublicaController
{
    public function helloworld($count) 
    {   
        $helloWord = 'R'.str_repeat('0', $count).'AR!';

        return new Response($count);
    }
}